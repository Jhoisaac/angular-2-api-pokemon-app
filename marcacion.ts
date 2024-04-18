import { ActionContext } from 'vuex'
import {
  CAROUSEL_SUCCESS,
  CAROUSEL_REQUEST,
  CAROUSEL_ERROR,
  MARCAR_REQUEST,
  MARCAR_ERROR,
  MARCAR_SUCCESS
} from '../actions/marcacion'
import { marcacionExposer } from '@/modules/marcacion/applicacion/marcacion.exposer'
import { IMarcacionForm } from '@/modules/marcacion/domain/template.request'
import { IMarcacion } from '@/modules/marcacion/domain/template.data'

interface IState {
  mstatus: string
  md2Empresa: string
}

const state = {
  status: '',
  md2Empresa: sessionStorage.getItem('d2Empresa') || 'BIOMETRIKA'
}

const getters = {
  status: (state: IState): string => state.mstatus,
  d2Empresa: (state: IState): string => state.md2Empresa
}

const actions = {
  [MARCAR_REQUEST]: ({ commit }, user) => {
    return new Promise((resolve, reject) => {
      commit(MARCAR_REQUEST)
      marcacionExposer
        .enviaMarcacion({
          username: user.username,
          password: user.password,
          macaddress: user.macaddress,
          hostname: user.hostname,
          dato: user.dato,
          fechaHora: user.fechaHora,
          lugar: user.lugar,
          pagina: user.pagina,
          parametro: user.parametro,
          timezone: user.timezone,
          online: `${user.online}`,
          transaccionId: user.transaccionId,
          empresa: user.empresa,
          foto: user.foto,
          tipo: user.tipo,
          observation: user.observation,
          even: user.even,
          carrousel: user.carrousel
        })
        .then((result) => {
          console.log('result.data es: ', result.data)
          commit(MARCAR_SUCCESS, result.data)
          //dispatch(USER_REQUEST);
          resolve(result)
        })
        .catch((err) => {
          commit(MARCAR_ERROR, err)
          reject(err)
        })
    })
  },
  [CAROUSEL_REQUEST]: ({ commit }: ActionContext<IState, IState>, data: IMarcacionForm): Promise<IMarcacion[]> => {
    return new Promise((resolve, reject) => {
      commit(CAROUSEL_REQUEST)
      marcacionExposer
        .getOpcionesCarousel(data)
        .then((response) => {
          //console.log('\n SEND DTA:', data)
          //console.log('\n WS CAROUSEL_REQUEST response:', response)

          const result = response.data
          //console.log('!!result:', result)
          //const eventTimes = parseServeEventTimes(result.auxiliar, data['start_time'])
          commit(CAROUSEL_SUCCESS)
          //commit(RESPONSE_TIMES_SUCCESS, eventTimes)
          //console.log('WS Trama:', response)
          //console.log('response.data.mensaje:', response.data.mensaje)
          if (response.data.respuesta === 0) {
            //console.log('resolve:', response.data.mensaje)
            //console.log('trama!!:', response.data.trama)
            //console.log('result.trama:', result.trama)
            resolve(result.trama)
          } else {
            //console.log('!!response.data.trama:', response.data.trama)
            //console.log('!!result.trama:', result.trama)
            reject(result.trama)
          }
        })
        .catch((err) => {
          //console.log('CAROUSEL_ERROR: error:', err)
          // const eventTimes = parseServeEventTimes(err.data, data['start_time'])
          commit(CAROUSEL_ERROR)
          //commit(RESPONSE_TIMES_ERROR, eventTimes)
          reject(err.message)
        })
    })
  }
}

const mutations = {
  [MARCAR_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [MARCAR_SUCCESS]: (state, payload) => {
    state.status = 'success'
  },
  [MARCAR_ERROR]: (state) => {
    state.status = 'error'
  },
  [CAROUSEL_REQUEST]: (state: IState): void => {
    state.mstatus = 'loading'
  },
  [CAROUSEL_SUCCESS]: (state: IState): void => {
    state.mstatus = 'success'
  },
  [CAROUSEL_ERROR]: (state: IState): void => {
    state.mstatus = 'error'
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
