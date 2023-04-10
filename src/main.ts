import { formatData } from "./formatar-data"
import './style.css'

export const maskCep = () => {
    const inputCampoCep = document.querySelector<HTMLInputElement>('#cep')
    const form = document.querySelector('form')
    const outputForm = document.querySelector('form')

    if (inputCampoCep && form && outputForm) {

        inputCampoCep.oninput = () => {
            const regexRemoveLetras = /\D/g
            const regexFormataCep = /(\d{5})(\d{3})/
            inputCampoCep.value = inputCampoCep.value.replace(regexRemoveLetras, '').replace(regexFormataCep, '$1-$2')
        }

        inputCampoCep.onblur = () => {
            const cepFromForm = inputCampoCep.value
            if (cepFromForm.length === 9 && cepFromForm.indexOf('-') === 5) {
                const apiUrl = `https://brasilapi.com.br/api/cep/v1/${inputCampoCep.value}`

                fetch(apiUrl).then(retorno => retorno.json())
                             .then((dadosAPI) => {
                                if (dadosAPI.cep) {
                                    Object.keys(dadosAPI).forEach((campoJSON) => {
                                        form[campoJSON].value = dadosAPI[campoJSON]
                                    })
                                }else {
                                    inputCampoCep.style.border = '2px solid red'
                                }
                             })
            }
        }
    }
}

const app = document.querySelector<HTMLFormElement>('#cadastroForm form')

if (app) {
    maskCep()
    app.onsubmit = (event) => {
        event.preventDefault()
        localStorage.setItem('dadosCadastrais', JSON.stringify(formatData(app)))
    }
}