import { classes } from '../../Class/model/ClassModel';
import { format } from 'date-fns'

interface ICreateClass {
  name: string;
  description: string;
  video: string;
  date_init: Date;
  date_end: Date;
}

export class CreateClassUseCase {
  async execute({
    name,
    description,
    video,
    date_init,
    date_end,
  }: ICreateClass) {
    //verificar se existe no Banco
    const checkIfVideoAlreadyExists = await classes.findOne({ video });

    if (checkIfVideoAlreadyExists) {
      return 'Class already Exists';
    }

    //inserir no banco
    await classes.insertMany({
      name,
      description,
      video,
      date_init,
      date_end,
      date_create:Date.now().toString(),
    });

    //retornar sem a senha por segurança
    const view = {
      ok: true,
      name,
      description,
      video,
      date_init,
      date_end,
    };

    return view;
  }
}