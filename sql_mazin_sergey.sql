##Задача 1
SELECT ROUND(MAX(DATEDIFF(CURDATE(), birthday)/365)) AS max_year 
FROM Student 
JOIN Student_in_class ON (Student.id  = Student_in_class.student)
JOIN Class ON (Student_in_class.class = Class.id )
WHERE Class.name = 10


##Задача 2
DELETE company FROM Company company
JOIN (SELECT company, COUNT(*) as trip_count 
FROM Trip 
GROUP BY company) trip ON company.id = trip.company
WHERE trip.trip_count = (SELECT MIN(trip_count) 
FROM (SELECT COUNT(*) as trip_count 
FROM Trip 
GROUP BY company
) 
as counts)


##Задача 3
SELECT ROUND(((COUNT(DISTINCT Reservations.user_id))/
(COUNT(DISTINCT Users.id))) * 100, 2) AS percent 
FROM Users 
LEFT JOIN Reservations ON Users.id = Reservations.user_id
