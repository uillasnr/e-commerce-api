import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
    cep: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    neighborhood: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    uf: {
        type: String,
        required: true,
    },
    freteData: [
        {
            Valor: {
                type: String,
                required: true,
            },
            MsgErro: {
                type: String,
                
            },
            PrazoEntrega: {
                type: String,
                required: true,
            },
        }
    ],
    createdAt: {
        type: Date, // Defina o tipo como Date para armazenar a data e hora de criação
        default: Date.now, // Defina o valor padrão como a data e hora atual
    },
});

const OrderSchema = new mongoose.Schema(
    {
        user: {
            id: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
        },
        products: [
            {
                id: {
                    type: Number,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                category: {
                    type: String,
                    required: true,
                },
                url_img1: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        freightValu: {
            type: Number,
            required: true,
        },
        address: {
            type: AddressSchema, // Inclui o esquema do subdocumento de endereço
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Order', OrderSchema);
