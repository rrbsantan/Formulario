document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;

    if (!navigator.geolocation) {
        alert("Geolocalização não suportada pelo seu navegador");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const dados = `${nome},${idade},${latitude},${longitude}\n`;

            fetch('https://api.github.com/repos/rrbsantana/Formulario/contents/dados.csv', {
                method: 'PUT',
                headers: {
                    'Authorization': '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',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: 'Atualizando dados',
                    content: btoa(dados),
                    sha: "SHA_DO_ARQUIVO_EXISTENTE"
                })
            }).then(response => response.json())
            .then(data => {
                alert("Dados enviados com sucesso!");
            })
            .catch(error => {
                console.error("Erro:", error);
                alert("Erro ao enviar os dados.");
            });

        },
        (error) => {
            alert("Erro ao obter localização: " + error.message);
        }
    );
});
