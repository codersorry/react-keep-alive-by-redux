import * as types from './cache-types'

export const create = (payload) => ({ type: types.CREATE, payload });

export const created = (payload) => ({ type: types.CREATED, payload })

export const changeSrcoll = (payload) => ({ type: types.SCROLL, payload })

export const destroy = (payload) => ({type: types.DESTROY, payload})