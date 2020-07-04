import java.io.IOException;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

import java.util.*;

public class FoodMap
    extends Mapper<LongWritable, Text, Text, Text> {

	@Override
	public void map(LongWritable key, Text value, Context context)
      throws IOException, InterruptedException {
    
	    String[] line = value.toString().lower().split(";");

	    if (!line[0].equals("index")) {

	    	String food = line[-1].split(" ")[0];

	    	//eliminate the brand labled foods
	    	if (!food.contains("'") && !food.matches("\\A\\p{ASCII}*\\z")) {
	    		//handle the key
	    		String f = line[-4];
	    		//first possibility is if the subcategory is located in in the index after food name
	    		if (!line[-3].isEmpty()) {
	    			f += " " + line[-3];
	    		}
	    		//second possibility is if the subcategory is if first index after food name is null but then the second index after contains the subcategory
	    		//but then the subcategory doesn't contains the word raw or uncooked 
	    		else if (!line[-2].isEmpty() && (!line[-2].contains("raw") && !line[-2].contains("uncooked"))) {
	    			f += " " + line[-2];
	    		}

	    		//handle the value
	    		String val = line[2] + ";" + line[3] + ";" + line[4] + ";" + line[5] + ";" + line[6] + ";" line[7];

	    		context.write(new Text(f), new Text(val));
	    	}
	    }	
	}
}