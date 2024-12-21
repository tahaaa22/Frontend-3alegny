using _3alegny.Entities;
using _3alegny.RepoLayer;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace _3alegny.Service_layer
{
    public class HospitalLogic
    {
        private readonly MongoDbContext _context;

        public HospitalLogic(MongoDbContext context)
        {
            _context = context;
        }

        // Method to add a department to a hospital
        public async Task<string> AddDepartment(string hospitalId, string departmentName)
        {   //Check if the hospital exists
            var hospital = await _context.Hospitals.Find(h => h.Id.ToString() == hospitalId).FirstOrDefaultAsync();
            if (hospital == null)
                throw new Exception("Hospital not found");

            var newDepartment = new Department { Name = departmentName };
            hospital.Departments.Add(newDepartment);

            await _context.Hospitals.ReplaceOneAsync(h => h.Id == hospital.Id, hospital);
            return "Department added successfully";
        }

        // Method to add a doctor to a hospital
        public async Task<string> AddDoctor(Doctors doctor)

        {   //Check if the hospital exists
            var hospital = await _context.Hospitals.Find(h => h.Id.ToString() == doctor.HospitalId).FirstOrDefaultAsync();
            if (hospital == null)
                throw new Exception("Hospital not found");

            

            // Check if the doctor's specialty matches an existing department in the hospital
            var matchingDepartment = hospital.Departments.FirstOrDefault(dept => dept.Name.Equals(doctor.Specialty, StringComparison.OrdinalIgnoreCase));
            if (matchingDepartment == null)
                throw new Exception("Department not found");


            hospital.Doctors.Add(doctor);
            await _context.Hospitals.ReplaceOneAsync(h => h.Id == hospital.Id, hospital);

            return "Doctor added successfully";
        }
    }
}
