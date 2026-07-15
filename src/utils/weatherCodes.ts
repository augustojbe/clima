export function getWeatherDescription(code: number): string {
  switch (code) {
    case 0:
      return "Céu limpo";
    case 1:
    case 2:
    case 3:
      return "Parcialmente nublado / Encoberto";
    case 45:
    case 48:
      return "Nevoeiro";
    case 51:
    case 53:
    case 55:
      return "Chuvisco";
    case 56:
    case 57:
      return "Chuvisco congelante";
    case 61:
    case 63:
    case 65:
      return "Chuva";
    case 66:
    case 67:
      return "Chuva congelante";
    case 71:
    case 73:
    case 75:
      return "Queda de neve";
    case 77:
      return "Grãos de neve";
    case 80:
    case 81:
    case 82:
      return "Pancadas de chuva";
    case 85:
    case 86:
      return "Pancadas de neve";
    case 95:
      return "Tempestade";
    case 96:
    case 99:
      return "Tempestade com granizo";
    default:
      return "Desconhecido";
  }
}
