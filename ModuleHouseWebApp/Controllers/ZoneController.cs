using Microsoft.AspNetCore.Mvc;
using ModuleHouseWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ModuleHouseWebApp.Controllers
{
    public class ZoneController : Controller
    {
        private static List<House> houses = new List<House>();

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult CreateHouse(House house)
        {
            if (ModelState.IsValid)
            {
                house.WeeksCount = GetWeeksCount(house.StartDate, house.EndDate);
                houses.Add(house);
                ViewBag.NewHouse = house; // Pass the new house to the view
                return View("Index");
            }
            return View("Index", house);
        }


        private int GetWeeksCount(DateTime startDate, DateTime endDate)
        {
            return (int)(endDate - startDate).TotalDays / 7;
        }

        public IActionResult GetHouses()
        {
            return Json(houses);
        }
    }
}

