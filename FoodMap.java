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

          String[] line = value.toString().split(";");

          //save macronutrients for each food item
          if (!line[0].equals("index")){
              String cName = line[11];

              String res = line[2] + ';' + line[3] + ';' + line[4] + ';' +
                     line[5] + ';' + line[6] + ';' + line[7];

              context.write(new Text(cName), new Text(res));

          }
      }
    }
