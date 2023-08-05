const stripe = require('stripe')('sk_test_51NTTWYJAKW5s1XT0vBfMBgCAQ7Ackfp4Jmi8moSq1vOryiyoKclDml6nt6depfDFIo1OAu0hzm44hpq2vOxH9CKV00jVvVCdg5');

class PaymentController {

  async store(req, res, orderResponse) {

    try {
      const { totalPrice, freightValu, products } = orderResponse;

      // Verifique se os dados esperados estão presentes na solicitação
      if (!products || !totalPrice) {
        return res.status(400).json({ error: 'Invalid request data' });
      }

      // Verifique se os produtos são um array e se cada produto tem as chaves id e quantity
      if (!Array.isArray(products) || products.some(product => !product.id || !product.quantity || !product.price)) {
        return res.status(400).json({ error: 'Invalid product data' });
      }



      const lineItems = products.map(product => ({
        price_data: {
          currency: 'BRL',
          unit_amount: Math.round(product.price * 100), // Converta para centavos e faça o arredondamento com base no preço individual do produto
          product_data: {
            name: product.name,
            images: [product.url_img1], // Chave corrigida para a URL da imagem do produto
            description: product.description,
          },
        },
        quantity: product.quantity,
      }));
     
      // Adiciona o frete como um item de linha separado
      lineItems.push({
        price_data: {
          currency: 'BRL',
          unit_amount: Math.round(freightValu * 100), // Converta para centavos e faça o arredondamento com base no valor do frete
          product_data: {
            name: 'Frete',
          },
        },
        quantity: 1,
      });

      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel'
      });
    //  console.log(session);
      // Resposta da URL do checkout
      return res.json({ url: session.url, products, freightValu, totalPrice });

    } catch (error) {
      console.error(error);
      return res.status(500).send('An error occurred while processing the payment.');
    }
  }
}

export default new PaymentController();
