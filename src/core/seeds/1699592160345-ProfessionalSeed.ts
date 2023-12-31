import { Professional } from '@psycare/entities';
import { MigrationInterface } from 'typeorm';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { Gender, Language, ProfessionalType } from '../../shared/enums';
import * as bcrypt from 'bcrypt';
import { AppDataSource } from 'src/data-source';
import { professionalData } from './data/professional';

export class ProfessionalSeed1699592160345 implements MigrationInterface {
    private generateProfessional(index: number): Professional {
        const professional = professionalData[index];

        const crpState = faker.number.int({ min: 1, max: 24 }).toString();

        return new Professional(
            faker.internet.email({
                firstName: professional.name,
                lastName: professional.surname,
                allowSpecialCharacters: false,
            }),
            bcrypt.hashSync('Teste123@', 10),
            faker.phone.number('(##) #####-####'),
            professional.name,
            professional.surname,
            professional.gender,
            faker.date.between({ from: '1980-01-01', to: '2004-01-01' }),
            faker.phone.number('###.###.###-##'),
            `${crpState.length === 1 ? `0${crpState}` : crpState}/${faker.phone.number('#####')}`,
            faker.helpers.enumValue(ProfessionalType),
            faker.helpers.arrayElements(Object.values(Language), { min: 1, max: 3 }),
            professional.abstract,
            professional.expericences,
            professional.specializations,
            professional.description,
            professional.historic,
        );
    }

    public async up(): Promise<void> {
        const professionals: Professional[] = [...Array(20)].map((_, index) => this.generateProfessional(index));

        professionals.unshift(
            new Professional(
                'profissional@gmail.com',
                bcrypt.hashSync('Teste123@', 10),
                '(54) 99936-2429',
                'Ana',
                'Silva',
                Gender.female,
                new Date('1994-09-14'),
                faker.phone.number('###.###.###-##'),
                faker.phone.number('##/#####'),
                ProfessionalType.psychologist,
                faker.helpers.arrayElements(Object.values(Language), { min: 1, max: 3 }),
                'Especializado em psicologia LGBTQ+, ofereço suporte sensível e inclusivo. Este é um espaço seguro para explorar questões relacionadas à diversidade com respeito e compreensão.',
                'Experiência em lidar com questões relacionadas à identidade de gênero, orientação sexual, discriminação e desafios específicos enfrentados pela comunidade LGBTQ+. Trabalho com adolescentes, adultos e casais.',
                'Especializado em questões relacionadas à comunidade LGBTQ+. Atuo no suporte emocional, orientação identitária, relacionamentos familiares e conjugais. Ofereço um espaço seguro para explorar temas específicos da comunidade LGBTQ+.',
                'Sou uma psicóloga comprometida em oferecer um espaço seguro e acolhedor para indivíduos LGBTQ+. Minha abordagem é inclusiva, respeitando a diversidade de identidades e orientações.',
                'Graduação em Psicologia pela Universidade XYZ e mestrado em Psicologia Clínica com foco em diversidade e inclusão. Participação em cursos e workshops voltados para a compreensão das complexidades LGBTQ+.',
            ),
        );

        await AppDataSource.getRepository(Professional).save(professionals);
    }

    public async down(): Promise<void> {}
}
