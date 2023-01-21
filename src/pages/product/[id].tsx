import { GetStaticPaths, GetStaticProps } from "next"
import { ImageContainer, ProductDetails, ProductContainer } from "../../styles/pages/product"
import { stripe } from "../../lib/stripe"
import Stripe from "stripe"
import Image from "next/image"
import { useRouter } from "next/router"
import axios from "axios"
import { useState } from "react"
import Head from "next/head"

interface IProductProps {
    product: {
        id: string
        name: string
        imageUrl: string
        price: string
        description: string
        defaultPriceId: string
    }
}

export default function Product({ product }: IProductProps) {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    const { isFallback } = useRouter()

    if (isFallback) {
        return <p>Loading...</p>
    }

    async function handleBuyProduct() {
        // console.log(product.defaultPriceId)

        try {
            setIsCreatingCheckoutSession(true)
            const response = await axios.post("/api/checkout", {
                priceId: product.defaultPriceId,
            })

            const { checkoutUrl } = response.data

            window.location.href = checkoutUrl
        } catch (error) {
            // conectar com uma ferramenta de observabilidade (datadog / sentry)
            alert("Falha ao redirecionar para o checkout!")
            setIsCreatingCheckoutSession(false)
        }
    }
    return (
        <>
            <Head>
                <title>{product.description} | Ignite Shop</title>
            </Head>
            <ProductContainer>
                <ImageContainer>
                    <Image src={product.imageUrl} width={520} height={480} alt="" />
                </ImageContainer>

                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{product.price}</span>

                    <p>{product.description}</p>
                    <button onClick={handleBuyProduct} disabled={isCreatingCheckoutSession}>
                        {isCreatingCheckoutSession ? "Carregando..." : "Comprar agora"}
                    </button>
                </ProductDetails>
            </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    // buscar os produtos mais vendidos / mais acessados

    return {
        paths: [{ params: { id: "prod_NAtPgk8Y7p2EOl" } }],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<any | undefined, { id: string }> = async ({ params }) => {
    const productId = params?.id

    if (productId) {
        const product = await stripe.products.retrieve(productId, {
            expand: ["default_price"],
        })

        const price = product.default_price as Stripe.Price

        return {
            props: {
                product: {
                    id: product.id,
                    name: product.name,
                    imageUrl: product.images[0],
                    description: product.description,
                    defaultPriceId: price.id,
                    price: price.unit_amount
                        ? new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                          }).format(price.unit_amount / 100)
                        : null,
                },
            },
            revalidate: 60 * 60 * 1, // 1 hour
        }
    }

    return {
        redirect: "/",
        props: {},
    }
}
