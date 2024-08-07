document.getElementById('bet-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const bank = parseFloat(document.getElementById('bank').value);
    const partes = parseInt(document.getElementById('partes').value);
    const factor = parseFloat(document.getElementById('factor').value);

    // Calcular el valor de cada parte (apuesta inicial)
    const apuesta_inicial = bank / partes;

    // Variables para rastrear la progresión y el consumo del bank
    let progresion = [];
    let consumido = 0;
    let perdidas_consecutivas = 0;
    let apuesta = apuesta_inicial;
    let mensaje_resultado = '';
    let detalles_apuestas = '';

    while (true) {
        if (perdidas_consecutivas === 0) {
            apuesta = apuesta_inicial;
        } else {
            apuesta = progresion[progresion.length - 1] * factor;
        }

        // Verificar si al agregar esta apuesta se excedería el bank
        if (consumido + apuesta > bank) {
            
            mensaje_resultado = `
                <h2>Resultado de la Progresión</h2>
                <ul>
                    <li><strong>El bank no puede soportar la siguiente progresión.</strong></li>
                    <li>Para realizar la siguiente apuesta, necesitarías <strong>${(apuesta - (bank - consumido)).toFixed(2)} COP</strong> adicionales.</li>
                    <li><strong>Resumen:</strong></li>
                    <ul>
                        <li>Número de pérdidas consecutivas soportadas: <strong>${perdidas_consecutivas}</strong></li>
                        <li>Total del bank consumido: <strong>${consumido.toFixed(2)} COP</strong></li>
                        <li>Valor de la última apuesta completada: <strong>${apuesta.toFixed(2)} COP</strong></li>
                    </ul>
                    <li>El bank no pudo soportar la apuesta de: <strong>${apuesta.toFixed(2)} COP</strong>, ya que solo quedaban <strong>${(bank - consumido).toFixed(2)} COP</strong> disponibles.</li>
                </ul>
                <h3>Detalles de las Apuestas:</h3>
                <ul>
                    ${detalles_apuestas}
                </ul>
            `;
            break;
        }

        progresion.push(apuesta);
        consumido += apuesta;
        perdidas_consecutivas++;

        // Mostrar la información de la apuesta actual
        detalles_apuestas += `<li><strong>Pérdida ${perdidas_consecutivas}:</strong> Apuesta de ${apuesta.toFixed(2)} COP</li>`;
    }

    // Mostrar resultados en la página
    document.getElementById('result').innerHTML = mensaje_resultado;
});
