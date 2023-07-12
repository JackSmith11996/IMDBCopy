package Controllers;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringReader;
import java.io.StringWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import Database.FilmDAO;
import Models.Film;
import Models.FilmList;
import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.JAXBException;
import jakarta.xml.bind.Marshaller;
import jakarta.xml.bind.Unmarshaller;

/**
 * Servlet implementation class FilmAPIController
 */

@WebServlet("/FilmAPIController")
public class FilmAPIController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	// Get method for API in all formats
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		FilmDAO dao = new FilmDAO();
		ArrayList<Film> allFilms = dao.getAllFilms();
		PrintWriter out = response.getWriter();
		/*
		 * if statements to get all 3 formats with an else to automatically put the API
		 * data to user
		 */
		if (request.getHeader("Accept").equals("application/json")) {
			request.setAttribute("films", allFilms);
			Gson gson = new Gson();
			String json = gson.toJson(allFilms);
			out.write(json);

		} else if (request.getHeader("Accept").equals("application/xml")) {
			FilmList cl = new FilmList(allFilms);
			StringWriter sw = new StringWriter();

			JAXBContext context;
			try {
				context = JAXBContext.newInstance(FilmList.class);
				Marshaller m = context.createMarshaller();
				m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
				m.marshal(cl, sw);

				out.write(sw.toString());
			} catch (JAXBException e) {

				e.printStackTrace();
			}

		} else if (request.getHeader("Accept").equals("text/plain")) {

			var data = allFilms.toString();
			out.write(data);
			
		}

		else {

			request.setAttribute("films", allFilms);
			Gson gson = new Gson();
			String json = gson.toJson(allFilms);
			out.write(json);

		}
		out.close();
	}

	// Post method for API to take data in all forms
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String data = request.getReader().lines().reduce("", (accumulator, actual) -> accumulator + actual);
		Film c = new Film();
		FilmDAO dao = new FilmDAO();
		PrintWriter out = response.getWriter();

		if (request.getHeader("Content-Type").equals("application/json")) {

			Gson gson = new Gson();
			c = gson.fromJson(data, Film.class);
			

		}

		else if (request.getHeader("Content-Type").equals("application/xml")) {

			try {
				JAXBContext jaxbContext = JAXBContext.newInstance(Film.class);
				Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
				c = (Film) jaxbUnmarshaller.unmarshal(new StringReader(data));
				System.out.println(c.toString());
			} catch (JAXBException e) {

				e.printStackTrace();
			}
		}
		else if (request.getHeader("Content-Type").equals("text/plain")){
			
			String[] sepArray = data.split(";");
			String[] setting = new String[5];
			for(int i = 0; i < sepArray.length; i++) {
				String seperateDetails[] = sepArray[i].split("=");
				setting[i] = seperateDetails[1];
			}
			c.setTitle(setting[0]);
			c.setYear(Integer.valueOf(setting[1]));
			c.setDirector(setting[2]);
			c.setReview(setting[3]);
			c.setStars(setting[4]);
			
		   
		
		  
		   
		}
		else {
			
			Gson gson = new Gson();
			c = gson.fromJson(data, Film.class);
			
		}
		try {
			dao.insertFilm(c);
			out.write("film Added");
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	// Put method to allow user to update any films in all formats
	protected void doPut(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String data = request.getReader().lines().reduce("", (accumulator, actual) -> accumulator + actual);
		Film c = new Film();
		FilmDAO dao = new FilmDAO();
		PrintWriter out = response.getWriter();

		if (request.getHeader("Content-Type").equals("application/json")) {

			Gson gson = new Gson();
			c = gson.fromJson(data, Film.class);

		}

		else if (request.getHeader("Content-Type").equals("application/xml")) {

			try {
				JAXBContext jaxbContext = JAXBContext.newInstance(Film.class);
				Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
				c = (Film) jaxbUnmarshaller.unmarshal(new StringReader(data));
				System.out.println(c.toString());
			} catch (JAXBException e) {

				e.printStackTrace();
			}
		}
		else if (request.getHeader("Content-Type").equals("text/plain")){
			
				String[] sepArray = data.split(";");
				String[] setting = new String[6];
				for(int i = 0; i < sepArray.length; i++) {
					String seperateDetails[] = sepArray[i].split("=");
					setting[i] = seperateDetails[1];
				}
				c.setId(Integer.valueOf(setting[0]));
				c.setTitle(setting[1]);
				c.setYear(Integer.valueOf(setting[2]));
				c.setDirector(setting[3]);
				c.setReview(setting[4]);
				c.setStars(setting[5]);
			}
		else {
			Gson gson = new Gson();
			c = gson.fromJson(data, Film.class);
		}
		try {
			dao.updateFilms(c);
			out.write("film updated");
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	// Delete method for the API that can take all formats
	protected void doDelete(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String data = request.getReader().lines().reduce("", (accumulator, actual) -> accumulator + actual);
		Film c = new Film();
		FilmDAO dao = new FilmDAO();
		PrintWriter out = response.getWriter();

		if (request.getHeader("Content-Type").equals("application/json")) {

			Gson gson = new Gson();
			c = gson.fromJson(data, Film.class);

		}

		else if (request.getHeader("Content-Type").equals("application/xml")) {

			try {
				JAXBContext jaxbContext = JAXBContext.newInstance(Film.class);
				Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
				c = (Film) jaxbUnmarshaller.unmarshal(new StringReader(data));
			} catch (JAXBException e) {

				e.printStackTrace();
			}
		}
		else if (request.getHeader("Content-Type").equals("text/plain")){
			
			
			System.out.println(data);
			String[] sepArray = data.split(";");
			System.out.println(sepArray);
			
			
			String seperateDetails[] = sepArray[0].split("=");
			
			c.setId(Integer.valueOf(seperateDetails[1]));
			
			
		   
		}
		else {
			Gson gson = new Gson();
			c = gson.fromJson(data, Film.class);
		}
		try {
			dao.deleteFilms(c);
			out.write("film deleted");
		} catch (SQLException e) {
			e.printStackTrace();
		}

		out.close();
	}

}
