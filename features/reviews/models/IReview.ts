export interface IReviews {
  [key: string]: IReview[]
}

export interface IReview {
  id: string
  car: string
  owner: string
  plate: string
  color: string
  hour: string
  status: 'pending' | 'completed'
}

export const items: IReviews = {
  '2024-07-10': [
    {
      id: '1',
      car: 'Renault Clio',
      owner: 'Pablo Villacres',
      plate: 'TDM-257',
      color: '#FFFFFF',
      hour: '17:00 PM',
      status: 'pending',
    },
    {
      id: '2',
      car: 'Mazda CX-3',
      owner: 'Carlos Juan Torres Lopez',
      plate: 'IBD-3454',
      color: '#FF5733',
      hour: '8:00 AM',
      status: 'completed',
    },
    {
      id: '3',
      car: 'Mazda Río',
      owner: 'Emilia Doménica Flores Galarza',
      plate: 'IHC-252',
      color: '#33FF57',
      hour: '11:00 AM',
      status: 'pending',
    },
    {
      id: '4',
      car: 'Chevrolet Aveo',
      owner: 'Pablo Martín Villacrés Morales',
      plate: 'UAC-321',
      color: '#5733FF',
      hour: '15:00 PM',
      status: 'completed',
    },
    {
      id: '5',
      car: 'Toyota Corolla',
      owner: 'Erick Daniel Ordoñez Zhu',
      plate: 'ABC-234',
      color: '#FFD700',
      hour: '10:00 AM',
      status: 'pending',
    },
    {
      id: '6',
      car: 'Toyota Corolla',
      owner: 'Erick Daniel Ordoñez Zhu',
      plate: 'ABC-234',
      color: '#FFD700',
      hour: '10:00 AM',
      status: 'pending',
    },
    {
      id: '7',
      car: 'Toyota Corolla',
      owner: 'Erick Daniel Ordoñez Zhu',
      plate: 'ABC-234',
      color: '#FFD700',
      hour: '10:00 AM',
      status: 'pending',
    },
  ],
  '2024-07-11': [
    {
      id: '6',
      car: 'Honda Civic',
      owner: 'Daniel Zhu',
      plate: 'XYZ-789',
      color: '#00FF00',
      hour: '9:00 AM',
      status: 'pending',
    },
    {
      id: '7',
      car: 'Ford Fiesta',
      owner: 'Carlos Lopez',
      plate: 'DEF-456',
      color: '#FF4500',
      hour: '11:30 AM',
      status: 'completed',
    },
    {
      id: '8',
      car: 'Volkswagen Golf',
      owner: 'Juan Torres',
      plate: 'GHI-101',
      color: '#1E90FF',
      hour: '14:00 PM',
      status: 'pending',
    },
    {
      id: '9',
      car: 'BMW 3 Series',
      owner: 'Emilia Galarza',
      plate: 'JKL-112',
      color: '#8A2BE2',
      hour: '16:30 PM',
      status: 'completed',
    },
    {
      id: '10',
      car: 'Audi A4',
      owner: 'Pablo Morales',
      plate: 'MNO-123',
      color: '#FF1493',
      hour: '13:00 PM',
      status: 'pending',
    },
  ],
  '2024-07-12': [
    {
      id: '11',
      car: 'Mercedes-Benz C-Class',
      owner: 'Erick Ordoñez',
      plate: 'PQR-789',
      color: '#FFD700',
      hour: '10:00 AM',
      status: 'completed',
    },
    {
      id: '12',
      car: 'Hyundai Elantra',
      owner: 'Juan Zhu',
      plate: 'STU-456',
      color: '#FF4500',
      hour: '9:30 AM',
      status: 'pending',
    },
    {
      id: '13',
      car: 'Kia Sorento',
      owner: 'Carlos Torres',
      plate: 'VWX-101',
      color: '#1E90FF',
      hour: '11:00 AM',
      status: 'completed',
    },
    {
      id: '14',
      car: 'Chevrolet Spark',
      owner: 'Emilia Lopez',
      plate: 'YZA-112',
      color: '#8A2BE2',
      hour: '12:30 PM',
      status: 'pending',
    },
    {
      id: '15',
      car: 'Nissan Sentra',
      owner: 'Pablo Galarza',
      plate: 'BCD-123',
      color: '#FF1493',
      hour: '14:00 PM',
      status: 'completed',
    },
  ],
}
