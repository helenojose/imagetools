<script setup>
import { ref } from 'vue'

const fileInput = ref(null)

const selectedFile = ref(null)
const previewUrl = ref(null)

const outputFormat = ref('png')
const isDragging = ref(false)
const processing = ref(false)

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

  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }

  previewUrl.value = URL.createObjectURL(file)

  const formatoOriginal = file.type.split('/')[1]

  if (formatoOriginal === 'png') {
    outputFormat.value = 'jpg'
  } else {
    outputFormat.value = 'png'
  }
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

function obterFormatoOriginal() {
  if (!selectedFile.value) {
    return ''
  }

  const tipo = selectedFile.value.type

  if (tipo === 'image/jpeg') return 'JPG'
  if (tipo === 'image/png') return 'PNG'
  if (tipo === 'image/webp') return 'WEBP'

  return tipo.split('/')[1].toUpperCase()
}

function converterImagem() {
  if (!selectedFile.value || processing.value) {
    return
  }

  processing.value = true

  const imagem = new Image()

  imagem.onload = () => {
    try {
      const canvas = document.createElement('canvas')

      canvas.width = imagem.width
      canvas.height = imagem.height

      const contexto = canvas.getContext('2d')

      if (!contexto) {
        throw new Error('Não foi possível criar o canvas.')
      }

      /*
       * JPG não suporta transparência.
       * Por isso colocamos fundo branco quando o destino for JPG.
       */
      if (outputFormat.value === 'jpg') {
        contexto.fillStyle = '#ffffff'

        contexto.fillRect(
          0,
          0,
          canvas.width,
          canvas.height
        )
      }

      contexto.drawImage(
        imagem,
        0,
        0,
        imagem.width,
        imagem.height
      )

      let mimeType = 'image/png'
      let extensao = 'png'

      if (outputFormat.value === 'jpg') {
        mimeType = 'image/jpeg'
        extensao = 'jpg'
      }

      if (outputFormat.value === 'webp') {
        mimeType = 'image/webp'
        extensao = 'webp'
      }

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            alert('Não foi possível converter a imagem.')
            processing.value = false
            return
          }

          const url = URL.createObjectURL(blob)

          const link = document.createElement('a')

          link.href = url
          link.download = `imagetools-convertida.${extensao}`

          document.body.appendChild(link)

          link.click()

          document.body.removeChild(link)

          URL.revokeObjectURL(url)

          processing.value = false
        },
        mimeType,
        0.92
      )

    } catch (error) {
      console.error(error)

      alert(
        'Não foi possível converter a imagem. Tente outra imagem.'
      )

      processing.value = false
    }
  }

  imagem.onerror = () => {
    alert('Não foi possível carregar a imagem.')

    processing.value = false
  }

  imagem.src = previewUrl.value
}

function escolherOutra() {
  if (processing.value) {
    return
  }

  selectedFile.value = null
  previewUrl.value = null

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

      <h1>Converter imagem</h1>

      <p>
        Converta suas imagens entre PNG, JPG e WEBP.
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
          🖼️
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

      <!-- CONVERSOR -->

      <div
        v-else
        class="converter-area"
      >

        <div class="preview">

          <img
            :src="previewUrl"
            alt="Imagem selecionada"
          />

          <div
            v-if="processing"
            class="processing-overlay"
          >

            <div class="spinner"></div>

            <strong>
              Convertendo imagem...
            </strong>

          </div>

        </div>

        <div class="file-info">

          <strong>
            {{ selectedFile.name }}
          </strong>

          <span>
            {{ obterFormatoOriginal() }}
            •
            {{ (selectedFile.size / 1024 / 1024).toFixed(2) }} MB
          </span>

        </div>

        <div class="format-selector">

          <h3>
            Converter para:
          </h3>

          <div class="formats">

            <button
              :class="{ active: outputFormat === 'png' }"
              :disabled="processing"
              @click="outputFormat = 'png'"
            >
              PNG
            </button>

            <button
              :class="{ active: outputFormat === 'jpg' }"
              :disabled="processing"
              @click="outputFormat = 'jpg'"
            >
              JPG
            </button>

            <button
              :class="{ active: outputFormat === 'webp' }"
              :disabled="processing"
              @click="outputFormat = 'webp'"
            >
              WEBP
            </button>

          </div>

        </div>

        <button
          class="convert-button"
          :disabled="processing"
          @click="converterImagem"
        >

          <span v-if="!processing">
            Converter e baixar
          </span>

          <span v-else>
            Convertendo...
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

    </div>

  </div>

</template>