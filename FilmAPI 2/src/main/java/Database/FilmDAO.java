package Database;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.sql.*;
import Models.Film;
import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;


public class FilmDAO {
	
	Film oneFilm = null;
	Connection conn = null;
    Statement stmt = null;
	String user = "smithjac";
    String password = "stigwomP6";
    // Note none default port used, 6306 not 3306
    String url = "jdbc:mysql://mudfoot.doc.stu.mmu.ac.uk:6306/"+user;

	public FilmDAO() {}

	
	@SuppressWarnings("deprecation")
	private void openConnection(){
		// loading jdbc driver for mysql
		try{
		    Class.forName("com.mysql.jdbc.Driver").newInstance();
		} catch(Exception e) { System.out.println(e); }

		// connecting to database
		try{
			// connection string for demos database, username demos, password demos
 			conn = DriverManager.getConnection(url, user, password);
		    stmt = conn.createStatement();
		} catch(SQLException se) { System.out.println(se); }	   
    }
	private void closeConnection(){
		try {
			conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	private Film getNextFilm(ResultSet rs){
    	Film thisFilm=null;
		try {
			thisFilm = new Film(
					rs.getInt("id"),
					rs.getString("title"),
					rs.getInt("year"),
					rs.getString("director"),
					rs.getString("stars"),
					rs.getString("review"));
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return thisFilm;		
	}
	
	
	
   public ArrayList<Film> getAllFilms(){
	   
		ArrayList<Film> allFilms = new ArrayList<Film>();
		openConnection();
		
	    // Create select statement and execute it
		try{
		    String selectSQL = "select * from films";
		    ResultSet rs1 = stmt.executeQuery(selectSQL);
	    // Retrieve the results
		    while(rs1.next()){
		    	oneFilm = getNextFilm(rs1);
		    	allFilms.add(oneFilm);
		   }

		    stmt.close();
		    closeConnection();
		} catch(SQLException se) { System.out.println(se); }

	   return allFilms;
   }

   public Film getFilmByID(int id){
	   
		openConnection();
		oneFilm=null;
	    // Create select statement and execute it
		try{
		    String selectSQL = "select * from films where id="+id;
		    ResultSet rs1 = stmt.executeQuery(selectSQL);
	    // Retrieve the results
		    while(rs1.next()){
		    	oneFilm = getNextFilm(rs1);
		    }

		    stmt.close();
		    closeConnection();
		} catch(SQLException se) { System.out.println(se); }

	   return oneFilm;
   }
   public void insertFilm(Film f) throws SQLException {

			openConnection();
		try {
			
			String insertSQL = "INSERT into films (title, year, director, stars, review) values ('" + f.getTitle() + "'," +
			f.getYear() + " ,'" + f.getDirector() + " ','" + f.getStars() + " ','" + f.getReview() + " ');";
			System.out.println(insertSQL);
			stmt.execute(insertSQL);
			
			stmt.close();
			closeConnection();
		} catch (SQLException s) {
			throw new SQLException("Film Not Added");
		}
		
	}
   
   public void updateFilms(Film f) throws SQLException{
	   
 		openConnection();
 		try {
 			String insertSQL = "UPDATE films SET title =' " + f.getTitle() + "', year = '" + f.getYear()
 			+ "', director = '" + f.getDirector() + "', stars = '" + f.getStars() + "', review = '" + f.getReview() + 
 			"' WHERE id = " + f.getId() + ";";
 			stmt.execute(insertSQL);
 			
 			stmt.close();
 		    closeConnection();
 		} catch(SQLException se) { System.out.println(se); }

 	   
    }
   public void deleteFilms(Film f) throws SQLException{
	   
		openConnection();
		try {
 			String insertSQL = "DELETE FROM films WHERE id = " + f.getId() + ";";
 			stmt.execute(insertSQL);
 			
 			stmt.close();
 		    closeConnection();
			}
		catch(SQLException se) { System.out.println(se); }

		}




 
   }
   
   
