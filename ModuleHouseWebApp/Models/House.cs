using System;
using System.ComponentModel.DataAnnotations;

namespace ModuleHouseWebApp.Models
{
    public class House
    {
        [Required(ErrorMessage = "Назва є обов'язковою")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Зона є обов'язковою")]
        [Range(1, 10, ErrorMessage = "Зона повинна бути між 1 та 10")]
        public int Zone { get; set; }

        [Required(ErrorMessage = "Ширина є обов'язковою")]
        [Range(1, int.MaxValue, ErrorMessage = "Ширина повинна бути більше 0")]
        public int Width { get; set; }

        [Required(ErrorMessage = "Висота є обов'язковою")]
        [Range(1, int.MaxValue, ErrorMessage = "Висота повинна бути більше 0")]
        public int Height { get; set; }

        [Required(ErrorMessage = "Бригада є обов'язковою")]
        public string Brigade { get; set; } = string.Empty;

        [Required(ErrorMessage = "Дата початку є обов'язковою")]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "Дата завершення є обов'язковою")]
        public DateTime EndDate { get; set; }

        public bool TechnicalTask { get; set; }

        public bool DesignSolutions { get; set; }

        public int WeeksCount { get; set; }
    }
}
