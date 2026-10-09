<template>
  <div class="home">
    <header class="header">
      <h1>ImageTools</h1>
      <p>Ferramentas de imagem rápidas, gratuitas e simples de usar</p>
      <p class="header-description">Converta formatos e remova fundos diretamente no navegador, sem criar uma conta.</p>
    </header>

    <main>
      <section class="tools" aria-label="Ferramentas disponíveis">
        <article class="tool-card">
          <div class="icon" aria-hidden="true">🖼️</div>
          <h2>Converter imagem</h2>
          <p>Converta imagens entre PNG, JPG e WEBP e escolha o formato mais adequado para seu uso.</p>
          <RouterLink to="/converter" class="button">Converter imagem</RouterLink>
        </article>
        <article class="tool-card">
          <div class="icon" aria-hidden="true">✂️</div>
          <h2>Remover fundo</h2>
          <p>Remova automaticamente o fundo de uma imagem e baixe o resultado em PNG com transparência.</p>
          <RouterLink to="/remover-fundo" class="button">Remover fundo</RouterLink>
        </article>
      </section>

      <section class="home-content content-section">
        <h2>Ferramentas de imagem em um só lugar</h2>
        <p>O ImageTools reúne ferramentas práticas para tarefas comuns com imagens. Você pode preparar arquivos para sites, lojas virtuais, apresentações, documentos e publicações em redes sociais, sem precisar instalar um programa de edição.</p>
        <p>As ferramentas foram pensadas para um fluxo direto: escolha uma imagem, execute a operação e baixe o resultado. Não é necessário criar uma conta para usar as funções principais.</p>

        <h2>Qual ferramenta devo usar?</h2>
        <div class="info-grid">
          <article class="info-card"><h3>Conversor de imagens</h3><p>Use quando precisar mudar o formato do arquivo. PNG é útil quando a transparência importa; JPG costuma ser prático para fotografias; WEBP pode oferecer arquivos menores mantendo boa qualidade.</p><RouterLink to="/converter">Abrir conversor →</RouterLink></article>
          <article class="info-card"><h3>Removedor de fundo</h3><p>Use para destacar um objeto ou pessoa, preparar fotos de produtos ou criar imagens que possam ser colocadas sobre outro fundo. O resultado depende da imagem e da separação entre o objeto e o cenário.</p><RouterLink to="/remover-fundo">Abrir removedor →</RouterLink></article>
        </div>

        <h2>Privacidade e processamento</h2>
        <p>A conversão é realizada no navegador. A remoção de fundo também utiliza recursos de processamento no navegador, embora possa precisar carregar modelos e arquivos técnicos externos. O desempenho varia conforme o dispositivo, o tamanho da imagem e o navegador.</p>
        <p>Antes de utilizar qualquer arquivo, confirme que você tem autorização para editá-lo. Para mais informações, leia nossa <RouterLink to="/privacidade">Política de Privacidade</RouterLink> e os <RouterLink to="/termos">Termos de Uso</RouterLink>.</p>
      </section>
    </main>

    <footer class="footer">
      <RouterLink to="/sobre">Sobre</RouterLink>
      <RouterLink to="/contato">Contato</RouterLink>
      <RouterLink to="/privacidade">Privacidade</RouterLink>
      <RouterLink to="/termos">Termos de Uso</RouterLink>
    </footer>
  </div>
</template>
