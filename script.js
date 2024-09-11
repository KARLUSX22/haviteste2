document.addEventListener('DOMContentLoaded', () => {
    const serviceButtons = document.querySelectorAll('.select-service');
    const bookingScreen = document.getElementById('bookingScreen');
    const serviceSelectionScreen = document.getElementById('serviceSelection');
    const backButton = document.getElementById('backButton');
    const bookingForm = document.getElementById('bookingForm');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const errorMessage = document.getElementById('errorMessage');
    const timeSelect = document.getElementById('time');

    const openingTime = 8; // 8 AM
    const closingTime = 19; // 7 PM
    const serviceDuration = 40; // Duration in minutes

    let selectedService = '';

    function generateAvailableTimes() {
        const times = [];
        let currentTime = openingTime * 60; // Start from 8 AM in minutes

        while (currentTime + serviceDuration <= closingTime * 60) {
            const hours = Math.floor(currentTime / 60);
            const minutes = currentTime % 60;
            const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
            times.push(formattedTime);
            currentTime += serviceDuration;
        }

        return times;
    }

    const availableTimes = {
        'Corte Clássico': generateAvailableTimes(),
        'Corte Moderno': generateAvailableTimes(),
        'Corte com Barba': generateAvailableTimes()
    };

    serviceButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            selectedService = event.target.getAttribute('data-service');
            serviceSelectionScreen.classList.add('hidden');
            bookingScreen.classList.remove('hidden');
            document.getElementById('bookingScreen').querySelector('h2').textContent = `Agende Seu Horário para ${selectedService}`;

            const times = availableTimes[selectedService] || [];
            timeSelect.innerHTML = '<option value="">Selecione uma hora</option>'; // Reset options
            times.forEach(time => {
                const option = document.createElement('option');
                option.value = time;
                option.textContent = time;
                timeSelect.appendChild(option);
            });
        });
    });

    backButton.addEventListener('click', () => {
        bookingScreen.classList.add('hidden');
        serviceSelectionScreen.classList.remove('hidden');
        confirmationMessage.textContent = '';
        errorMessage.textContent = '';
    });

    bookingForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        // Validações simples
        if (!name || !phone || !date || !time) {
            errorMessage.textContent = 'Todos os campos são obrigatórios.';
            confirmationMessage.textContent = '';
            return;
        }

        const message = `Agendamento confirmado para ${name} com ${selectedService} no dia ${date} às ${time}.`;

        try {
            const response = await fetch('/api/send-sms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    to: phone, // Número do cliente
                    body: message
                })
            });

            if (!response.ok) {
                throw new Error('Erro na resposta da API.');
            }

            confirmationMessage.textContent = `Agendamento confirmado para ${name} com ${selectedService} no dia ${date} às ${time}.`;
            errorMessage.textContent = '';
            bookingForm.reset(); // Limpar o formulário após o envio
        } catch (error) {
            console.error('Erro ao enviar a confirmação:', error); // Adiciona log para ajudar a depurar
            errorMessage.textContent = 'Erro ao enviar a confirmação. Tente novamente.';
            confirmationMessage.textContent = '';
        }
    });
});
