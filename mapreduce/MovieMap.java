import java.io.IOException;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

import java.util.*;

public class MovieMap
    extends Mapper<LongWritable, Text, Text, Text> {

	@Override
	public void map(LongWritable key, Text value, Context context)
      throws IOException, InterruptedException {
    
	    String[] line = value.toString().split(";");

	    if (!line[0].equals("")) {
	    	try{

		    	String title = line[1];
		    	//check to see if the title is all ascii, contains no brackets, year is > 1980, and rating > 2.5
		    	if (title.matches("\\A\\p{ASCII}*\\z") && !title.contains("(") && Float.parseFloat(line[4]) > 2.5 && Integer.parseInt(line[6]) >= 1980){
		    		String res = line[6] + ";" + line[7];
		    		context.write(new Text(title), new Text(res));
		    	}

	    	}
	    	catch(Exception e) {

	    	}
	    }	
	}
}