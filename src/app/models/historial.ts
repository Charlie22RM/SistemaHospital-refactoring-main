export class Historial {
  constructor(
    public id: number = 0,
    public edad: number = 0,
    public altura: number = 0,
    public peso: number = 0,
    public masaCorporal: number = 0,
    public temperatura: number = 0,
    public frecuenciaRespiratoria: number = 0,
    public presionArterial: number = 0,
    public frecuenciaCardiaca: number = 0,
    public diabetes: boolean = false,
    public diabetesDescripcion: string = '',
    public tiroideas: boolean = false,
    public tiroideasDescripcion: string = '',
    public hipertension: boolean = false,
    public hipertensionDescripcion: string = '',
    public cardiopatia: boolean = false,
    public cardiopatiaDescripcion: string = '',
    public traumatismo: boolean = false,
    public traumatismoDescripcion: string = '',
    public cancer: boolean = false,
    public cancerDescripcion: string = '',
    public otros: boolean = false,
    public otrosDescripcion: string = ''
  ) { }
}

