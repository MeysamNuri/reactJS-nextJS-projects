import _ from 'lodash'

export const pageinate=(courses,currentPage,perpage)=>{
    const startIndex=(currentPage - 1 ) * perpage

    return _(courses).slice(startIndex).take(perpage).value()
}