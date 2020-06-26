import java.io.IOException;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

import java.util.*;

public class SpotifyMap
    extends Mapper<LongWritable, Text, Text, Text> {

	@Override
	public void map(LongWritable key, Text value, Context context)
      throws IOException, InterruptedException {
    
	    String[] line = value.toString().split("\\|");

	    if (!line[0].equals("track") && line[0].matches("\\A\\p{ASCII}*\\z") && line[1].matches("\\A\\p{ASCII}*\\z")) {

	    	try {
	    		if (!(line[0].contains(";") || line[0].contains(":") || line[0].contains("@") || line[0].contains("/"))){
		    		String cName = line[0] + "|" + line[1];

			    	String res = line[4] + "|" + line[11] + "|" + line[12] + "|" + line[19];

			    	context.write(new Text(cName), new Text(res));
	    		}
	    	}
	    	catch(Exception e) {

	    	}
	    }	
	}
}