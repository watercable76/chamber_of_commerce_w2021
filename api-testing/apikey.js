
export class weatherKey {
    constructor() {
        this.key = `http://api.openweathermap.org/data/2.5/forecast?id=${city_id}&appid=07edcaccc064119c281855eedd314fc9&units=imperial`;
    }

    get KeyValue() {
        return this.key;
    }
}
