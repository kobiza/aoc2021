import _ from 'lodash'
import solutionsMap from './solutions/solutionsMap'

_.forEach(solutionsMap, (lib, libKey) => {
    window[libKey] = lib
})


