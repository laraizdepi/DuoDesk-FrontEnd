interface Offices {
    name: string,
    description: string,
    host: any,
    isActive: boolean,
    generalAmenities: string[]
    spaces: {
        nameSpace: string,
        typeSpace: string,
        capacitySpace: number,
        availableSpace: number,
        hourPrice: number,
        dayPrice: number,
        weekPrice: number,
        monthPrice: number,
        nameAmenities: string[],
        imagesUrls: string[],
        booking?: any
    }[],
    address: any,
    scores?: {
        averageScore: number,
        reviews: any
    },
    days: [{
        day: string,
        isAvailable: boolean,
        startHour?: string,
        endHour?: string
    }],
    notifications: string[],
    official: string[],
    openDate: string
}

export { }

const typeOffice = (type: string, data: Offices[], callback: (send?: any) => void) => {
    const finalData = data.filter((element) => {
        const result = element.spaces.filter((space) => {
            if (space.typeSpace === type) {
                return true
            }
            return false
        })
        if (result.length > 0) {
            return true
        }
        return false
    }).map((element) => {
        element.spaces = element.spaces.filter((space) => {
            if (space.typeSpace === type) {
                return true
            }
        })
        return element
    })
    console.log(finalData)
    return callback(finalData)
}

const extremePrices = (data: Offices[]) => {
    if (data.length > 0) {
        let min = data[0].spaces[0].hourPrice
        let max = data[0].spaces[0].hourPrice
        for (let office of data) {
            for (let space of office.spaces) {
                if (space.hourPrice < min) {
                    min = space.hourPrice
                }
                if (space.hourPrice > max) {
                    max = space.hourPrice
                }
                if (space.dayPrice < min) {
                    min = space.dayPrice
                }
                if (space.dayPrice > max) {
                    max = space.dayPrice
                }
                if (space.weekPrice < min) {
                    min = space.weekPrice
                }
                if (space.weekPrice > max) {
                    max = space.weekPrice
                }
                if (space.monthPrice < min) {
                    min = space.monthPrice
                }
                if (space.monthPrice > max) {
                    max = space.monthPrice
                }
            }
        }
        return { min, max }
    }
}

const rangeOfPrices = (data: Offices[], callback: (send?: any) => void, time?: 'hour' | 'day' | 'week' | 'month', prices?: [number, number]) => {
    let dataCopy = data.slice()
    if (time && prices) {
        console.log(time, prices)
        const finalData = dataCopy.filter((element) => {
            const result = element.spaces.filter((space) => {
                if(space[`${time}Price`] > prices[0] && space[`${time}Price`] < prices[1]){
                    return true
                }
                return false
            })
            if(result.length !== 0){
                return true
            }
            return false
        }).map((element) => {
            element.spaces = element.spaces.filter((space) => {
                if(space[`${time}Price`] > prices[0] && space[`${time}Price`] < prices[1]){
                    return true
                }
                return false
            })
            return element
        })
        console.log("Final Data: ", finalData)
        return callback(finalData)
    }
    else{
        return callback(data)
    }
}

const selectDays = (days: string | undefined = undefined, data: Offices[], callback: (send?: any) => void) => {
    let finalData: Offices[] = []
    if (days === "week") {
        finalData = data.filter((element) => {
            console.log(element)
            for (let day of element.days) {
                if (day.day === 'Week') {
                    return true
                }
            }
            return false
        })
    }
    else if (days === "with saturday") {
        finalData = data.filter((element) => {
            let count = 0
            for (let day of element.days) {
                if (day.day === 'Week') {
                    count++
                }
                else if (day.day === "Saturday") {
                    count++
                }
            }
            if (count === 2) {
                return true
            }
            return false
        })
    }
    else if (days === "with sunday") {
        finalData = data.filter((element) => {
            let count = 0
            for (let day of element.days) {
                if (day.day === 'Week') {
                    count++
                }
                else if (day.day === "Sunday") {
                    count++
                }
            }
            if (count === 2) {
                return true
            }
            return false
        })
    }
    else if (days === "all") {
        finalData = data.filter((element) => {
            let count = 0
            for (let day of element.days) {
                if (day.day === 'Week') {
                    count++
                }
                else if (day.day === "Saturday") {
                    count++
                }
                else if (day.day === "Sunday") {
                    count++
                }
            }
            if (count === 3) {
                return true
            }
            return false
        })
    }
    else {
        finalData = data.slice()
    }
    return callback(finalData)
}

const amenities = (list: string[], data: Offices[], callback: (send?: any) => void, filterSpaces?: string) => {
    const finalData = data.filter((element) => {
        if (filterSpaces) {
            for (let item of list) {
                const result = element.spaces.filter((element) => {
                    if (element.typeSpace === filterSpaces) {
                        if (element.nameAmenities.includes(item)) {
                            return true
                        }
                        return false
                    }
                    return false
                })
                if (result.length === 0) {
                    return false
                }
                else {
                    return true
                }
            }
        }
        else {
            for (let item of list) {
                if (!element.generalAmenities.includes(item)) {
                    const result = element.spaces.filter((element) => {
                        if (element.nameAmenities.includes(item)) {
                            return true
                        }
                        else {
                            return false
                        }
                    })
                    if (result.length === 0) {
                        return false
                    }
                    else {
                        return true
                    }
                }
                return true
            }
        }
    })
    return callback(finalData)
}

const filterRange = (rating: number, data: Offices[], callback: (send?: any) => void) => {
    const finalData = data.map((element) => {
        if (element.scores?.averageScore) {
            if (Math.round(rating) <= Math.round(element.scores.averageScore)) {
                return element
            }
        }
        return element
    }).sort((office1, office2) => {
        if (office1.scores?.averageScore) {
            if (office2.scores?.averageScore) {
                if (Math.round(office1.scores.averageScore) > Math.round(office2.scores.averageScore)) {
                    return -1
                }
                else {
                    return 1
                }
            }
            else {
                return -1
            }
        }
        else if (office2.scores?.averageScore) {
            return 1
        }
        return 0
    })
    return callback(finalData)
}

const filter = {
    byType: typeOffice,
    byPrices: rangeOfPrices,
    byDays: selectDays,
    byAmenities: amenities,
    byRange: filterRange,
    getMinMax: extremePrices
}

export default filter