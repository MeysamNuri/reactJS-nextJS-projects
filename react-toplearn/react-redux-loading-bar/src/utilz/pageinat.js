import _ from 'lodash'

export const pageInate=(courses,currentPage,perpage)=>{
    const startIndex=(currentPage - 1) * perpage;
    return _(courses).slice(startIndex).take(perpage).value()
}