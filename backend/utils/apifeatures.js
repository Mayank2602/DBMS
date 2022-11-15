class ApiFeatures {
    constructor(query, queryStr) { //if we are searching for a product names pizza then queryStr=pizza & in productController file on line 18 product.find=query=keyword
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword, //regular expression
                    $options: "i", //this means case insensitive search
                },
            }
            : {};

        this.query = this.query.find({ ...keyword });
        return this; //returning the same class
    }

    filter() {
        const queryCopy = { ...this.queryStr } //this is done to create an actual copy of queryStr instead of passing just a reference
        //Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach(key => delete queryCopy[key]);

        //Filter for Price an Rating

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);
        //this function is case sensitive because categories are directly displayed to the customer and are not varied acc to his choice
        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        //lets say there are 50 paroducts, 10 each page then if user asks for 2nd page then 10 products of page 1 are skipped
        const skip = resultPerPage * (currentPage - 1)
        //this.query is actually product.find() method
        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}


module.exports = ApiFeatures;