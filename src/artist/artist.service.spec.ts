import { Artist } from 'generated/prisma/client'
import { ArtistDto } from './dto/artist.dto'
import { ArtistService } from './artist.service'
import { PrismaService } from '../prisma/prisma.service'
import { Test, TestingModule } from '@nestjs/testing'

const artistId = 'test-id-1'

const artists: Artist[] = [
    { id: artistId, name: 'bob', genre: 'pop' },
    { id: 'test-id-2', name: 'bob2', genre: 'pop' },
    { id: 'test-id-3', name: 'bob3', genre: 'pop' }
]

const artist: Artist = artists[0]

const dto: ArtistDto = {
    name: artist.name,
    genre: artist.genre
}

const db = {
    artist: {
        findMany: jest.fn().mockResolvedValue(artists),
        findUnique: jest.fn().mockResolvedValue(artist),
        create: jest.fn().mockResolvedValue(artist)
    }
}

describe('Artist Service', () => {
    let service: ArtistService
    let prisma: PrismaService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ArtistService,
                {
                    provide: PrismaService,
                    useValue: db,
                }
            ],

        }).compile()

        service = module.get<ArtistService>(ArtistService)
        prisma = module.get<PrismaService>(PrismaService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    it('should return an array of artists', async () => {
        const artists = await service.findAll()
        expect(artists).toEqual(artists)
    })

    it('should return a single artists by id', async () => {
        expect(service.findOne(artistId)).resolves.toEqual(artist)
    })

    it('should create a new artist', async () => {
        expect(service.create(dto)).resolves.toEqual(artist)
    })
})