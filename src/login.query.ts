
function InsertQueryGenerator(tableName:string,columns:object){
     let column_names = "";
     let values = "";
     let i = 0;
     for (const x in columns) {
         const y = x as keyof typeof columns;
         if (i > 0) {
             column_names += ","; 
             values += ",";
         }
         column_names += y;
         console.log(column_names);
         if(typeof columns[y] === "string") {
             const c = columns[y] as unknown as string;
             if (!c.includes("Now()")) {
                values += `'${columns[y]}'`;
             } else {
                values += `${columns[y]}`;
             }
         }
         else{
             values += `${columns[y]}`;
         }
         i++;
     }
     const query = `INSERT INTO ${tableName} (${column_names}) VALUES (${values})`;
     return query;
 }


function selectQueryGenerator(table:string,conditions:object,columns?:Array<string>){
 
    let column_Name = "";

    let i =0;
    if (!columns){
        column_Name = "*";
    }
    else{
        for (const x in columns) {
            if (i > 0) {
                column_Name += ",";
            }
            column_Name += x;
            i++;
        }
    }

    let query = `SELECT ${column_Name} FROM ${table}`;
    
    i = 0;

    for (const x in conditions) {
        if (i === 0) {
            query += " WHERE ";
        } 
        else {
            query += " AND ";
        }

        const result = conditions[x as keyof typeof conditions];
        if (typeof result === "string") {
            const c = result as unknown as string;
            if(c.includes("Now()") && !c.includes("lesserThan") && !c.includes("greaterThan")) {
                query += ` ${x} = ${result}`;
            } else if (c.includes("lesserThan")) {
                query += `${x} <= ${c.substring(c.indexOf("(")+1, c.lastIndexOf(")"))}`;
            } else if (c.includes("greaterThan")) {
                query +=`${x} >= ${c.substring(c.indexOf("(")+1, c.lastIndexOf(")"))}`;
            }
            else {
                query += `${x} = '${result}'`;
            } 
        }
        else {
            query += `${x} = ${result}`;
        }
        i++;
    }
    


  console.log(query);
  return query;
}

export{selectQueryGenerator,InsertQueryGenerator};