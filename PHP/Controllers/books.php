<?php
class books{
    Private $path_to_cover;
    Private $publication_year;
    Private $book_id;
    Private $title;
    Private $author_id;
    Private $copies_sold;
    Private $record_last_edited;

    public function get_information($path_to_cover, $publication_year, $book_id, $title, $author_id, $copies_sold){
        $this->path_to_cover=$path_to_cover;
        $this->publication_year=$publication_year;
        $this->book_id=$book_id;
        $this->title=$title;
        $this->author_id=$author_id;
        $this->copies_sold=$copies_sold;
        }
    
    public function logs($record_last_edited){
        $this->record_last_edited=$record_last_edited;
    }

    public function insert_book($pdo){
        $query="INSERT INTO books(`path_to_cover`,`publication_year`,`title`,`author_id`,`copies_sold`) VALUES(:ptc,:py,:t,:ai,:cs)";
        $stmt=$pdo->prepare($query);
        $stmt->bindParam(":ptc", $this->path_to_cover);
        $stmt->bindParam(":py", $this->publication_year);
        $stmt->bindParam(":t", $this->title);
        $stmt->bindParam(":ai", $this->author_id);
        $stmt->bindParam(":cs", $this->copies_sold);
        $stmt->execute() or die(print_r($stmt->errorInfo(),true));
    }

    public function update_book($pdo){
        $query="INSERT INTO logs(`book_id`, `username`) VALUES(:bi, :un)";
        $stmt=$pdo->prepare($query);
        $username=$_SESSION['username'];
        $stmt->bindParam(":bi", $this->book_id);
        $stmt->bindParam(":un", $username);
        $stmt->execute();

        $query2="SELECT `time_of_update` FROM logs order by log_id desc LIMIT 1";
        $stmt2=$pdo->prepare($query2);
        $stmt2->execute();
        $record = $stmt2->fetch(PDO::FETCH_ASSOC);

        $query3 = "UPDATE books SET path_to_cover=:ptc, publication_year=:py, title=:t, author_id=:ai, copies_sold=:cs, record_last_edited=:rle where book_id=:b";
        $stmt3=$pdo->prepare($query3);
        $stmt3->bindParam(":ptc", $this->path_to_cover);
        $stmt3->bindParam(":py", $this->publication_year);
        $stmt3->bindParam(":b", $this->book_id);
        $stmt3->bindParam(":t", $this->title);
        $stmt3->bindParam(":ai", $this->author_id);
        $stmt3->bindParam(":cs", $this->copies_sold);
        $stmt3->bindParam(":rle", $record[`time_of_update`]);
        $stmt3->execute();
    }

    public function get_bookids($pdo){
        $query="SELECT * FROM books";
        $stmt=$pdo->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row;
    }

    public function search_book_by_id($pdo, $book_id){
        $query = "SELECT * FROM books WHERE book_id=?";
        $stmt = $pdo->prepare($query);
        $stmt->execute(array($book_id));
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row;
    }

    public function display_all_books($pdo){
        $query = "SELECT * FROM books";
        $stmt = $pdo->prepare($query);
        $stmt->execute();
        $records = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $records[] = $row;
        }
    return $records;
    }

    public function delete_book($pdo, $book_id){
        $query = "Delete FROM books where book_id=?";
        $stmt = $pdo->prepare($query);
        $stmt->execute(array($book_id));
    }

}
?>