import java.io.IOException;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

public class CocktailMap
    extends Mapper<LongWritable, Text, Text, Text> {

	@Override
	public void map(LongWritable key, Text value, Context context)
      throws IOException, InterruptedException {
    
	    String[] line = value.toString().split(";");

	    if (!line[0].equals("name")) {
	    	String cName = line[0] + ";" + line[1];

	    	//Clean strings for which there is space in the 0th index
	    	for (int i = 3; i < 10; i += 2) {
	    		if (line[i].length() > 0 && line[i].charAt(0) == ' ') {
	    			line[i] = line[i].substring(1);
	    		}
	    	}

	    	String res = line[3] + ";" + line[5] + ";" + line[7] + ";" + line[9];

	    	context.write(new Text(cName), new Text(res));
	    }	
	}
}