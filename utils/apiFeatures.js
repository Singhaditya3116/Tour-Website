class APIFeatures{
    constructor(query,queryString){ //mongossequery,query from express
        this.query=query;
        this.queryString=queryString;
    }
        filter(){
            //BUILD QUERY
            //1A)FILTERING
            const queryObj = { ...this.queryString }; //creating a copy of the object 
            const excludedFields = ['page','sort','limits','fields'];
            excludedFields.forEach(el => delete queryObj[el]);
           // console.log(queryObj);

            //1B)ADVANCE FILTERING
            //{ difficulty: 'easy', duration: { $gte: '5' } }  --mongo 
            // { difficulty: 'easy', duration: { gte: '5' } }    --req.query
            let queryStr = JSON.stringify(queryObj);
            queryStr =queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match => `$${match}`);
            //console.log(queryStr);
            this.query=this.query.find(JSON.parse(queryStr));
            return this;
        }

        sort(){
            //2)SORTING
            if(this.queryString.sort)
            {
                const sortBy =this.queryString.sort.split(",").join(" ");
                this.query=this.query.sort(sortBy);
            }else{
                this.query=this.query.sort('-createdAt');
            }
            return this;
        }

        limitFields(){
                //3)FIELD LIMITING
            if(this.queryString.fields)
            {
                const fields = this.queryString.fields.split(",").join(" ");
                //console.log(fields);
                this.query=this.query.select(fields);
            }else{
                this.query=this.query.select('-__v -summary'); //not send __v
            }
            return this;
        }

        paginate(){
                //4]PAGINATION
            const page =this.queryString.page * 1 || 1;
            const limit = this.queryString.limit * 1 || 100;
            const skip = (page-1)*limit;
            this.query=this.query.skip(skip).limit(limit);
            return this;
        }
}

module.exports = APIFeatures;