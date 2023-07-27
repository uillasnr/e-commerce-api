const ApiNodeCorreios = require("node-correios");

class FreightController {

  async store(request, response) {

    const correios = new ApiNodeCorreios();
    const { type, cep, sCepDestino } = request.body;

    try {
      if (type === "CEP") {
        // realiza a consulta com o CEP 
        const result = await correios.consultaCEP({ cep });
        return response.json(result);


      } else if (type === "calculateFreight") {
        // Valores fixos do frete
        const nCdServico = "40010";
        const sCepOrigem = "22270010";
        const nVlPeso = 1;
        const nCdFormato = 1;
        const nVlComprimento = 27;
        const nVlAltura = 8;
        const nVlLargura = 10;
        const nVlDiametro = 18;

        //  realiza o cálculo do frete
        const result = await correios.calcPrecoPrazo({
          nCdServico,
          sCepOrigem,
          sCepDestino,
          nVlPeso,
          nCdFormato,
          nVlComprimento,
          nVlAltura,
          nVlLargura,
          nVlDiametro,
        });

        return response.json(result);
      } else {
        // Se o tipo não for 'consultCEP' nem 'calculateFreight', retorna uma resposta de erro
        return response.status(400).json({ error: "Invalid operation type." });
      }
    } catch (error) {
      return response.status(500).json({ error: "Error in the request." });
    }
  }
}
export default new FreightController();
