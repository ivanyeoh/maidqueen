<?php

class Booking
{
    public $slots = array();
    public $is_ok = true;

    public function __construct()
    {
        for ($i=0; $i<=11; $i++) {
            $this->slots[] = array(
                'time' => $i,
                'maids' => 6,
                'occupied' => 0,
                'booked' => 0,
            );
        }
    }

    public function total()
    {
        $total = 0;
        foreach ($this->slots as $slot) {
            $total += $slot['booked'];
        }
        return $total;
    }

    public static function create($orders)
    {
        $booking = new Booking;
        foreach ($orders as $t=>$o) {
            $booking->book($t, $o);
        }
        return $booking;
    }

    public function book($time, $maid)
    {
        if (!$this->manipulate($time, -1 * $maid)) {
            $this->manipulate($time, 1);
            return false;
        }
        return true;
    }

    public function manipulate($time, $maid)
    {
        $slots = $this->slots;

        $slots[$time-1]['maids'] += $maid;
        $slots[$time]['maids'] += $maid;
        $slots[$time+1]['maids'] += $maid;

        if (
            $slots[$time-1]['maids'] < 0  ||
            $slots[$time]['maids']  < 0 ||
            $slots[$time+1]['maids'] < 0
        ) {
            $this->is_ok = false;
        }


        $slots[$time-1]['occupied'] -= $maid;
        $slots[$time]['occupied'] -= $maid;
        $slots[$time+1]['occupied'] -= $maid;

        $slots[$time]['booked'] -= $maid;

        $this->slots = $slots;

        return $this->is_ok;
    }
}

$orders = isset($_REQUEST['orders']) ? json_decode($_REQUEST['orders'], true) : array();
$order = isset($_REQUEST['order']) ? $_REQUEST['order'] :  null;

$old_orders = $orders;

if ($order) {
    $orders[$order] = isset($orders[$order]) ? $orders[$order] + 1 : 1;
}

$booking = Booking::create($orders);

if (!$booking->is_ok) {
    $orders = $old_orders;
    $booking = Booking::create($orders);
    echo "maid is fully occupied at this hour.";
    echo "maid only avail at:<br>";
    for ($i=1; $i<=10; $i++) {
        $tb = Booking::create($orders);
        if ($tb->book($i, 1)) {
            $tt = $i + 10;
            echo "$tt<br>";
        }
    }
}

echo "<style>
    .green td { background-color: green; }
    .yellow td { background-color: yellow; }
    .orange td { background-color: orange; }
    .red td { background-color: red; }
    .grey td { background-color: grey; }
    </style>";

$o = json_encode($orders);


echo "<table border=1>";
$slots = $booking->slots;

foreach ($slots as $slot) {
    $t = $slot['time'] + 10;
    $avail_css = 'green';

    switch ($slot['maids']) {
        case 3:
            $avail_css = 'yellow';
            break;
        case 2:
            $avail_css = 'orange';
            break;
        case 1:
            $avail_css = 'red';
            break;
        case 0:
            $avail_css = 'grey';
            break;
    }
    echo "<tr class='$avail_css'>";
    if ($slot['time'] != 0 && $slot['time'] < count($slots) -1) {
        echo "<td><a href='?order={$slot['time']}&orders=$o'>{$t}</a></td>";
    } else {
        echo "<td>{$t}</td>";
    }
    echo "<td>{$slot['maids']} available</td>";
    echo "<td>{$slot['occupied']} occupied</td>";
    echo "<td>{$slot['booked']} order</td>";
    echo "<tr>";
}
echo "<tr><td colspan=3>Total Orders:</td><td>".$booking->total()."</td></tr>";
echo "</table>";
