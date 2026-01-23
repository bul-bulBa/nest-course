import { Test, TestingModule } from "@nestjs/testing"
import { ArtistController } from "./artist.controller"
import { ArtistService } from "./artist.service"
import { NotFoundException } from "@nestjs/common"

const ARTIST_ID ='test-id-1'

const artist = {
    id:  ARTIST_ID,
    name: 'bob',
    genre: 'horror',
}

const DTO = {
    name: 'bob',
    genre: 'horror'
}

describe('Artist Controller', () => {
    let controller: ArtistController
    let service: ArtistService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ArtistController],
            providers: [
                {
                    provide: ArtistService,
                    useValue: {
                        findAll: jest.fn().mockResolvedValue([artist]),
                        findOne: jest.fn().mockResolvedValue(artist),
                        create: jest.fn().mockResolvedValue(artist),
                    }
                }
            ]
        }).compile()

        controller = module.get<ArtistController>(ArtistController)
        service = module.get<ArtistService>(ArtistService)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    it('should return an array of artists', async () => {
        const result = await controller.findAll()
        expect(result).toEqual([artist])
    })

    it('should return a single artists by id', async () => {
        const result = await controller.findOne(ARTIST_ID)
        expect(result).toEqual(artist)
    })

    it('should throw NotFoundException if artist not found', async () => {
        jest.spyOn(service, 'findOne')
        .mockRejectedValueOnce(new NotFoundException('artist not found'))

        try {
            await controller.findOne('123456')
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException)
            expect(error.message).toBe('artist not found')
        }
    })

    it('should create a new artist', async () => {
        const result = await controller.create(DTO)
        expect(result).toEqual(artist)
    })
})