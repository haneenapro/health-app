import { useEffect } from "react"

export function timerData(_data) {
    let _upComingDates = []
    if (_data && _data.length > 0) {
        _data.map((_elm) => {
            return {
                ..._elm,
                times: _elm.times.map((_eTi) =>
                    _upComingDates.push(new Date(_eTi).getTime())
                ),
            }
        })

        if (_upComingDates && _upComingDates.length > 0) {
            let _filterNewDates = _upComingDates.filter(
                (_elm) => _elm > new Date().getTime()
            )
            if (_filterNewDates.length > 0) {
                let _newTime = Math.min(..._filterNewDates)
                if (_newTime) {
                    setTimeout(() => {
                        alert("Time to take med")
                        timerData(_data)
                    }, (_newTime - new Date().getTime()))
                } else {
                    return
                }
            }
        }
    }
}

export const getTimeHelper = (id) => {
    const _getLocalData = typeof window !== "undefined" && localStorage.getItem(id)
    useEffect(() => {
        if (_getLocalData) {
            timerData(JSON.parse(_getLocalData))
        }
    }, [_getLocalData])
    return null
}