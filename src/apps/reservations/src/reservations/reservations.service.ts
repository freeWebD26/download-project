import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { ReservationRepository } from './reservations.repository';
const { GoogleGenerativeAI } = require("@google/generative-ai");

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
  ) {}
  create(createReservationDto: CreateReservationDto) {
    return this.reservationRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId: '123'
    })
  }

  findAll() {
    return this.reservationRepository.find({});
  }

  findOne(_id: string) {
    return this.reservationRepository.findOne({_id});
  }

  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneAndUpdate(
      {_id},
      {$set: updateReservationDto}
    )
  }

  remove(_id: string) {
    return this.reservationRepository.findOneAndDelete({_id})
  }

  async googleGenerative(prompt: string) {
    // Implement Google Generative AI API integration here
    // Example:
    // const response = await axios.post('https://api.example.com/generate', { prompt });
    // return response.data.result;
    const genAI = new GoogleGenerativeAI("AIzaSyD3pPLo9PbLm1tcqXbvZPEmI_NRi3pcji8");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    prompt = "Explain how AI works";
    const result = await model.generateContent(prompt);
    return result;

  }
}
