<script setup>
import { ref } from 'vue'
import { removeBackground } from '@imgly/background-removal'

const fileInput = ref(null)

const selectedFile = ref(null)
const originalPreview = ref(null)
const resultPreview = ref(null)

const processing = ref(false)
const processingProgress = ref(0)

const isDragging = ref(false)

const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100 MB

function abrirSeletor() {
  if (!processing.value) {
    fileInput.value.click()
  }
}

function selecionarArquivo(event) {
  const file = event.target.files[0]

  if (file) {
    carregarArquivo(file)
  }
}

function carregarArquivo(file) {

  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
    alert('Selecione uma imagem PNG, JPG ou WEBP.')
    return
  }

  if (file.size > MAX_FILE_SIZE) {
    alert('A imagem deve ter no máximo 100 MB.')
    return
  }

  selectedFile.value = file

  if (originalPreview.value) {
    URL.revokeObjectURL(originalPreview.value)
  }

  if (resultPreview.value) {
    URL.revokeObjectURL(resultPreview.value)
  }

  originalPreview.value = URL.createObjectURL(file)

  resultPreview.value = null
  processingProgress.value = 0
}

function arrastar(event) {
  event.preventDefault()

  if (!processing.value) {
    isDragging.value = true
  }
}

function sairArrastar(event) {
  event.preventDefault()

  isDragging.value = false
}

function soltar(event) {
  event.preventDefault()

  isDragging.value = false

  if (processing.value) {
    return
  }

  const file = event.dataTransfer.files[0]

  if (file) {
    carregarArquivo(file)
  }
}

async function removerFundo() {

  if (!selectedFile.value || processing.value) {
    return
  }

  processing.value = true
  processingProgress.value = 0

  try {

    const blob = await removeBackground(
      selectedFile.value,
      {
        progress: (key, current, total) => {

          if (total > 0) {

            processingProgress.value = Math.round(
              (current / total) * 100
            )

          }

        }
      }
    )

    resultPreview.value = URL.createObjectURL(blob)

  } catch (error) {

    console.error(error)

    alert(
      'Não foi possível remover o fundo da imagem. Tente outra imagem.'
    )

  } finally {

    processing.value = false
    processingProgress.value = 100

  }
}

function baixarImagem() {

  if (!resultPreview.value) {
    return
  }

  const link = document.createElement('a')

  link.href = resultPreview.value
  link.download = 'imagem-sem-fundo.png'

  document.body.appendChild(link)

  link.click()

  document.body.removeChild(link)
}

function escolherOutra() {

  if (processing.value) {
    return
  }

  if (originalPreview.value) {
    URL.revokeObjectURL(originalPreview.value)
  }

  if (resultPreview.value) {
    URL.revokeObjectURL(resultPreview.value)
  }

  selectedFile.value = null
  originalPreview.value = null
  resultPreview.value = null
  processingProgress.value = 0

  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>

<template>

  <div class="page">

    <RouterLink to="/" class="back">
      ← Voltar
    </RouterLink>

    <div class="page-content">

      <h1>Remover fundo</h1>

      <p>
        Remova o fundo da sua imagem automaticamente.
      </p>

      <input
        ref="fileInput"
        type="file"
        accept="image/png,image/jpeg,image/webp"
        hidden
        @change="selecionarArquivo"
      />

      <!-- UPLOAD -->

      <div
        v-if="!selectedFile"
        class="upload-box"
        :class="{ dragging: isDragging }"
        @dragover="arrastar"
        @dragleave="sairArrastar"
        @drop="soltar"
      >

        <div class="upload-icon">
          ✂️
        </div>

        <h2>
          Arraste sua imagem aqui
        </h2>

        <p>
          PNG, JPG ou WEBP • Máximo 100 MB
        </p>

        <button
          class="button"
          @click="abrirSeletor"
        >
          Escolher imagem
        </button>

      </div>

      <!-- PROCESSAMENTO -->

      <div
        v-else-if="!resultPreview"
        class="background-remover"
      >

        <div
          class="background-preview"
          :class="{ 'processing-preview': processing }"
        >

          <img
            :src="originalPreview"
            alt="Imagem selecionada"
          />

          <div
            v-if="processing"
            class="processing-overlay"
          >

            <div class="spinner"></div>

            <strong>
              Removendo fundo...
            </strong>

            <span>
              {{ processingProgress }}%
            </span>

          </div>

        </div>

        <div class="file-info">

          <strong>
            {{ selectedFile.name }}
          </strong>

          <span>
            {{ (selectedFile.size / 1024 / 1024).toFixed(2) }} MB
          </span>

        </div>

        <button
          class="convert-button"
          :disabled="processing"
          @click="removerFundo"
        >

          <span v-if="!processing">
            ✂️ Remover fundo
          </span>

          <span v-else>
            Processando...
          </span>

        </button>

        <button
          class="change-button"
          :disabled="processing"
          @click="escolherOutra"
        >
          Escolher outra imagem
        </button>

      </div>

      <!-- RESULTADO -->

      <div
        v-else
        class="background-remover"
      >

        <div class="result-title">

          <h2>
            Imagem sem fundo
          </h2>

          <p>
            Seu fundo foi removido com sucesso.
          </p>

        </div>

        <div class="background-preview result">

          <img
            :src="resultPreview"
            alt="Imagem sem fundo"
          />

        </div>

        <button
          class="download-button"
          @click="baixarImagem"
        >
          ↓ Baixar PNG
        </button>

        <button
          class="change-button"
          @click="escolherOutra"
        >
          Remover fundo de outra imagem
        </button>

      </div>

    </div>

    <section class="content-section tool-guide">
      <h2>Como remover o fundo de uma imagem</h2>
      <ol>
        <li>Escolha uma imagem PNG, JPG ou WEBP.</li>
        <li>Aguarde enquanto a ferramenta analisa a imagem e processa o recorte.</li>
        <li>Confira o resultado e baixe o arquivo PNG com fundo transparente.</li>
      </ol>
      <p>O primeiro processamento pode demorar mais porque o navegador pode precisar carregar os recursos do modelo. Imagens grandes e dispositivos com pouca memória também podem aumentar o tempo de espera.</p>

      <h2>Quando usar uma imagem sem fundo?</h2>
      <div class="format-guide">
        <article><h3>Fotos de produtos</h3><p>Ajude a destacar um produto em catálogos, lojas virtuais e materiais promocionais.</p></article>
        <article><h3>Apresentações e documentos</h3><p>Coloque uma pessoa, objeto ou ilustração sobre outro fundo sem manter o cenário original.</p></article>
        <article><h3>Conteúdo digital</h3><p>Prepare imagens para posts, miniaturas e peças gráficas, respeitando os direitos de uso do arquivo original.</p></article>
      </div>

      <h2>Dicas para um resultado melhor</h2>
      <ul><li>Prefira imagens nítidas e bem iluminadas.</li><li>Procure usar fotos em que o objeto principal se diferencie do fundo.</li><li>Confira cabelos, pelos, objetos transparentes e bordas finas, pois podem ser mais difíceis de recortar.</li><li>Se o resultado não ficar bom, tente outra imagem ou uma versão com melhor resolução.</li></ul>

      <h2>Perguntas frequentes</h2>
      <details><summary>Em qual formato posso baixar o resultado?</summary><p>O resultado é disponibilizado em PNG, que permite preservar a transparência do fundo removido.</p></details>
      <details><summary>A ferramenta funciona com qualquer imagem?</summary><p>Ela aceita PNG, JPG e WEBP de até 100 MB, mas o resultado varia conforme a imagem, o dispositivo e os recursos disponíveis no navegador.</p></details>
      <details><summary>Minha imagem é enviada para um servidor do ImageTools?</summary><p>O processamento é executado no navegador. Para carregar os recursos técnicos necessários, a aplicação pode buscar arquivos externos. Consulte a Política de Privacidade para detalhes.</p></details>
      <details><summary>Por que o processamento demora?</summary><p>A análise pode exigir recursos significativos do dispositivo. O primeiro uso também pode demorar mais por causa do carregamento dos arquivos necessários.</p></details>
    </section>

  </div>

</template>