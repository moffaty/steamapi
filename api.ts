import axios, { AxiosInstance } from 'axios';

class ApiService {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL: baseURL,
            timeout: 5000, // Опционально, задаёт таймаут для запросов
        });
    }

    // Функция для выполнения GET-запроса
    public async getRequest(url: string): Promise<any> {
        try {
            const response = await this.axiosInstance.get(url);
            return response.data; // Возвращаем данные из ответа
        } catch (error) {
            // Обработка ошибок
            if (axios.isAxiosError(error)) {
                console.error('Error message:', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            throw error; // Бросаем ошибку дальше для обработки
        }
    }
}

const apiService = new ApiService('https://api.steampowered.com/'); // Задай базовый URL
apiService.getRequest('/ISteamUser/GetPlayerSummaries/v0002/?key=11431FAA05650478564E77D2B7003ED2&steamids=76561198818864500')
    .then(data => {
        console.log(JSON.stringify(data, null, 2));
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });