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
    const finalData = data.map((element) => {
        element.spaces.sort((space1, space2) => {
            if (space1.typeSpace === type) {
                if (space2.typeSpace === type) {
                    return 0
                }
                else {
                    return -1
                }
            }
            else if (space2.typeSpace === type) {
                return 1
            }
            else {
                return 0
            }
        })
        return element
    })
    return callback(finalData)
}

const rangeOfPrices = (time: 'hour' | 'day' | 'week' | 'month', prices: number[], data: Offices[], callback: (send?: any) => void) => {
    const finalData = data.map((element) => {
        element.spaces.sort((space1, space2) => {
            if (space1[`${time}Price`] < space2[`${time}Price`]) {
                return -1
            }
            return 1
        })
        return element
    })
    return callback(finalData)
}

enum Days{
    week = 'week',
    withSaturday = 'with saturday',
    withSunday = 'with sunday',
    all = 'all'
}

const selectDays = (days: Days = Days.all, data: Offices[], callback: (send?: any) => void, openHour?: string, closeHour?: string) => {
    let finalData: Offices[] = data.slice()
    if (days === "week") {
        finalData = data.filter((element) => {
            if (element.days.includes({ day: 'week', isAvailable: true })) {
                return true
            }
            return false
        })
    }
    else if (days === "with saturday") {
        finalData = data.filter((element) => {
            if (element.days.includes({ day: 'saturday', isAvailable: true })) {
                return true
            }
            return false
        })
    }
    else if (days === "with sunday") {
        finalData = data.filter((element) => {
            if (element.days.includes({ day: 'sunday', isAvailable: true })) {
                return true
            }
            return false
        })
    }
    else if (days === "all") {
        finalData = data.filter((element) => {
            if (
                element.days.includes({ day: 'week', isAvailable: true }) &&
                element.days.includes({ day: 'saturday', isAvailable: true }) &&
                element.days.includes({ day: 'sunday', isAvailable: true })) {
                return true
            }
            return false
        })
    }
    return callback(finalData)
}

const amenities = (list: string[], data: Offices[], callback: (send?: any) => void) => {
    const finalData = data.filter((element) => {
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
    byRange: filterRange
}

export default filter