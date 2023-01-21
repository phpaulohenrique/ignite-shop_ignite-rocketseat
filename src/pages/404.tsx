import Link from "next/link"
import { Container } from "../styles/pages/404"

export default function pageNotFound() {
    return (
        <Container>
            <h1>Erro 404</h1>
            <span>Pagina não encontrada</span>
            <Link href="/">Voltar</Link>
        </Container>
    )
}
