interface Offices {
    id: string,
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

const byAmenities = (list: string[], data: Offices[]) => {
    const finalData = data.filter((office) => {
        if (list.length > 0) {
            for (let amenity of list) {
                if (office.generalAmenities.includes(amenity)) {
                    return true
                }
                else {
                    const result = office.spaces.filter((space) => {
                        if (space.nameAmenities.includes(amenity)) {
                            return true
                        }
                        return false
                    })
                    if (result && result.length > 0) {
                        office.spaces = result
                        return true
                    }
                    else {
                        return false
                    }
                }
            }
        }
        else {
            return true
        }
    })
    return finalData
}

const byDays = (days: string | undefined = undefined, data: Offices[]) => {
    let finalData: Offices[] = []
    if (days === "week") {
        finalData = data.filter((element) => {
            console.log(element)
            for (let day of element.days) {
                if (day.day === 'Week') return true
            }
            return false
        })
    }
    else if (days === "with saturday") {
        finalData = data.filter((element) => {
            let count = 0
            for (let day of element.days) {
                if (day.day === 'Week') count++
                else if (day.day === "Saturday") count++
            }
            if (count === 2) return true
            return false
        })
    }
    else if (days === "with sunday") {
        finalData = data.filter((element) => {
            let count = 0
            for (let day of element.days) {
                if (day.day === 'Week') count++
                else if (day.day === "Sunday") count++
            }
            if (count === 2) return true
            return false
        })
    }
    else if (days === "all") {
        finalData = data.filter((element) => {
            let count = 0
            for (let day of element.days) {
                if (day.day === 'Week') count++
                else if (day.day === "Saturday") count++
                else if (day.day === "Sunday") count++
            }
            if (count === 3) return true
            return false
        })
    }
    else {
        finalData = data.slice()
    }
    return finalData
}

const getMinMax = (data: Offices[]) => {
    let min = data[0].spaces[0].hourPrice
    let max = data[0].spaces[0].hourPrice
    for(let office of data){
        for(let space of office.spaces){
            if(space.hourPrice < min) min = space.hourPrice
            if(space.dayPrice < min) min = space.dayPrice
            if(space.weekPrice < min) min = space.weekPrice
            if(space.monthPrice < min) min = space.monthPrice
            if(space.hourPrice > max) max = space.hourPrice
            if(space.dayPrice > max) max = space.dayPrice
            if(space.weekPrice > max) max = space.weekPrice
            if(space.monthPrice > max) max = space.monthPrice
        }
    }
    return {min, max}
}

const byPrices = (data: Offices[], prices: [number, number], period: string) => {
    const comparePrices = (min: number, max: number, price: number) => {
        console.log('Min:', min)
        console.log('Max:', max)
        console.log('Price:', price)
        if(min <= price && price <= max){
            return true
        }
        return false
    }

    const finalData = data.filter((office) => {
        let result = []
        if(period === 'hour') result = office.spaces.filter((space) => comparePrices(prices[0], prices[1], space.hourPrice))
        else if(period === 'day') result = office.spaces.filter((space) => comparePrices(prices[0], prices[1], space.dayPrice))
        else if(period === 'week') result = office.spaces.filter((space) => comparePrices(prices[0], prices[1], space.weekPrice))
        else if(period === 'month') result = office.spaces.filter((space) => comparePrices(prices[0], prices[1], space.monthPrice))
        else return true

        if(result.length > 0){
            return true
        }
        return false
    })

    return finalData
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
    byAmenities,
    byDays,
    byPrices,
    byRange: filterRange,
    getMinMax
}

export default filter