export const isEmpty = (str: string | undefined) => (str === undefined ? false : true);
export const toCapitalCase = (str: string) => { return  str ? str.charAt(0).toUpperCase() + str.toLocaleLowerCase().slice(1) : "not worked" }
export const getAverageRating = (list: number[]) => {
    if (list.length === 0) {
        return 0
    }
    const count = list.length
    const total = list.reduce((total, currentValue) => (total + currentValue))
    return Number((total / count).toFixed(2))
}