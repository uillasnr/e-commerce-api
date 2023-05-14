/* Criando o Schema de pedidos no mongo */

import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
    {
        user: {
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        },

        products: [
            {
                id: {
                    type: Number,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                /*    description: {  
                       type: String,
                       required: true
                   },  */
                price: {
                    type: Number,
                    required: true
                },
                category: {
                    type: String,
                    required: true
                },
                url_img1: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            },
        ],
        totalPrice: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Order', OrderSchema)