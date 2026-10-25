const paginas = document.querySelectorAll("main > section");

function abrirPagina(id) {
    const pagina = document.getElementById(id);

    if (!pagina || !pagina.matches("main > section")) {
        return;
    }

    paginas.forEach(function (secao) {
        secao.classList.add("pagina-oculta");
    });

    pagina.classList.remove("pagina-oculta");

    // Reinicia a animação da página
    pagina.style.animation = "none";
    void pagina.offsetWidth;
    pagina.style.animation = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Abre a página inicial e ativa os cliques nos links internos
document.addEventListener("DOMContentLoaded", function () {
    abrirPagina("inicio");

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (evento) {
            const id = link.getAttribute("href").substring(1);
            const destino = document.getElementById(id);

            if (!destino) return;

            const secao = destino.closest("main > section");

            if (secao) {
                evento.preventDefault();
                abrirPagina(secao.id);
            }
        });
    });
});

// Formulário de contacto pelo WhatsApp
const formulario = document.getElementById("formulario-cotacao");

if (formulario) {
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const carro = document.getElementById("carro").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        const telefone = "258842520140";

        const texto =
            "Olá, Luxghate Global Lda!\n\n" +
            "Nome: " + nome + "\n" +
            "Viatura pretendida: " + carro + "\n" +
            "Detalhes: " + (mensagem || "Não especificados");

        const link =
            "https://wa.me/" + telefone +
            "?text=" + encodeURIComponent(texto);

        window.open(link, "_blank");
    });
}function atualizarAbaAtiva(id) {
    document.querySelectorAll(".cabecalho nav a").forEach(function (link) {
        const destino = link.getAttribute("href").substring(1);
        const secao = document.getElementById(destino);
        const pagina = secao && secao.closest("main > section");

        const ativa = destino === id ||
            (pagina && pagina.id === id);

        link.classList.toggle("aba-ativa", Boolean(ativa));
    });
}

const abrirPaginaOriginal = abrirPagina;

abrirPagina = function (id) {
    abrirPaginaOriginal(id);
    atualizarAbaAtiva(id);
};

atualizarAbaAtiva("inicio");