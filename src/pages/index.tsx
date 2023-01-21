import Image from "next/image"
import { HomeContainer, NavigationWrapperKeenSlider, Product } from "../styles/pages/home"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Link from "next/link"
import { useState } from "react"
import { Arrow } from "../components/KeenSlider/Arrow"
import { GetStaticProps } from "next"
import { stripe } from "../lib/stripe"
import Stripe from "stripe"
import Head from "next/head"

interface IHomeProps {
    products: {
        id: string
        name: string
        imageUrl: string
        price: string
    }[]
}

export default function Home({ products }: IHomeProps) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
        slides: {
            perView: 3.3,
            spacing: 32,
        },
    })

    return (
        <>
            <Head>
                <title>Ignite Shop</title>
            </Head>

            <NavigationWrapperKeenSlider>
                <HomeContainer ref={sliderRef} className="keen-slider">
                    {products.map((product) => (
                        <Link key={product.id} href={`/product/${product.id}`} prefetch={false}>
                            <Product className="keen-slider__slide">
                                <Image
                                    src={product.imageUrl}
                                    width={440}
                                    height={400}
                                    alt=""
                                    quality={100}
                                    placeholder="blur"
                                    blurDataURL={product.imageUrl}
                                />

                                <footer>
                                    <strong>{product.name}</strong>
                                    <span>{product.price}</span>
                                </footer>
                            </Product>
                        </Link>
                    ))}
                </HomeContainer>

                {loaded && instanceRef.current && (
                    <>
                        <Arrow
                            left
                            onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
                            disabled={currentSlide === 0}
                        />

                        <Arrow
                            onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
                            disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
                        />
                    </>
                )}
            </NavigationWrapperKeenSlider>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const response = await stripe.products.list({
        expand: ["data.default_price"],
    })
    console.log(response.data)

    const products = response.data.map((product) => {
        const price = product.default_price as Stripe.Price

        return {
            id: product.id,
            name: product.name,
            imageUrl: product.images[0],
            price: price.unit_amount
                ? new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                  }).format(price.unit_amount / 100)
                : null,
        }
    })

    return {
        props: {
            products,
        },
        revalidate: 60 * 60 * 24 * 1, // 1 day
    }
}
