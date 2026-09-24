<template>

  <div class="home">

    <header class="header">

      <h1>
        ImageTools
      </h1>

      <p>
        Ferramentas de imagem rápidas e gratuitas
      </p>

    </header>

    <main class="tools">

      <div class="tool-card">

        <div class="icon">
          🖼️
        </div>

        <h2>
          Converter imagem
        </h2>

        <p>
          Converta suas imagens entre PNG, JPG e WEBP.
        </p>

        <RouterLink
          to="/converter"
          class="button"
        >
          Começar
        </RouterLink>

      </div>

      <div class="tool-card">

        <div class="icon">
          ✂️
        </div>

        <h2>
          Remover fundo
        </h2>

        <p>
          Remova o fundo da sua imagem automaticamente.
        </p>

        <RouterLink
          to="/remover-fundo"
          class="button"
        >
          Começar
        </RouterLink>

      </div>

    </main>

    <footer class="footer">

      <RouterLink to="/sobre">
        Sobre
      </RouterLink>

      <RouterLink to="/privacidade">
        Privacidade
      </RouterLink>

      <RouterLink to="/termos">
        Termos de Uso
      </RouterLink>

    </footer>

  </div>

</template>