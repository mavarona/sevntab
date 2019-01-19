/* eslint-disable space-before-function-paren */
import Api from '@/services/Api'

export default {
    register(credentials) {
        return Api().post('register', credentials)
    }
}